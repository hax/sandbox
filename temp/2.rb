          while true
             begin
               bytes = read(2).unpack("C*")
               fin = (bytes[0] & 0x80) != 0
               opcode = bytes[0] & 0x0f
               mask = (bytes[1] & 0x80) != 0
               plength = bytes[1] & 0x7f
               if plength == 126
                 bytes = read(2)
                 plength = bytes.unpack("n")[0]
               elsif plength == 127
                 bytes = read(8)
                 (high, low) = bytes.unpack("NN")
                 plength = high * (2 ** 32)  low
               end
               if @server && !mask
                 # Masking is required.
                 @socket.close()
                 raise(WebSocket::Error, "received unmasked data")
               end
               mask_key = mask ? read(4).unpack("C*") : nil
               payload = read(plength)
               payload = apply_mask(payload, mask_key) if mask
               if WebSocket.debug
                 $stderr.printf("recv_frame> opcode:%d fin:%d payload:%p\n" % [opcode, fin ? 1 : 0, payload])
               end
               case opcode
                 when OPCODE_TEXT
                   return force_encoding(payload, "UTF-8")
                 when OPCODE_BINARY
                   raise(WebSocket::Error, "received binary data, which is not supported")
                 when OPCODE_CLOSE
                   close(1005, "", :peer)
                   return nil
                 when OPCODE_PING
                   raise(WebSocket::Error, "received ping, which is not supported")
                 when OPCODE_PONG
                   next
                 else
                   raise(WebSocket::Error, "received unknown opcode: %d" % opcode)
               end
             rescue EOFError
               return nil
