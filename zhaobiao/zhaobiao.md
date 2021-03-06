# 网站建设项目招标响应指南


## 项目概述

### 背景
【写一段废话，比如：自十一届三种全会以来，我们沐浴在改革的春风中……】
### 目标
【总体性的，但最好有定性（但不要定量）的指标，比如网站受众群大幅增加，群众满意度增加……】
### 约束
【项目的资源约束，比如时间、人力、配备岗位编制、资金……】

## 网站内容和功能规划
【总体性的，粗略一些，勿精确到栏目设置。内容和功能较多时尽量排个优先级，方便安排到不同的项目阶段，或在资源不够时裁剪。】

## 网站交互和视觉设计要求
【各种高大上……但勿出现“点击三次必达”这样无厘头的硬指标。最好有示意图。如有交互示意，宜用线框图或手画草图，勿用视觉效果图。】

## 网站运营和管理需求
【前面是面向最终用户的，这个是面向工作人员的。对应功能的罗列以外，对交互的要求注重的不是好看，而是好用，以操作效率为优先。考虑到运营管理的便捷性，须基于BS（浏览器）的管理界面。】

### 网站监控
应有网站状况监控。重要事件和突发事件应有短信之类的方式迅速通知到负责人。日常情况宜有汇总通知（如Email、短信等方式）。

### 权限控制
应用权限控制，应根据需求对权限模型做出说明，并符合相关政策要求。

## 技术方案

### 系统运维

可选方案：
* 主机托管
* 基于IaaS
* 基于PaaS
* 混合式方案

从维护成本考虑，宜全部或部分采用云服务。现在绝大部分互联网服务均部分或全部托管在云，少部分顶级互联网企业则自建云。

如采用传统的主机托管于ICP机房的方式，需对后期维护方式做出规划，并对将来扩容等问题做出合理的预测。

为确保用户访问网站和服务的稳定性和速度，可能需要使用CDN（内容分发网络）。

如果使用PaaS方案，需考虑云服务商所提供的服务对于需求的可能限制。

国内可选的云服务商：

* 微软Azure（由世纪互联运营）
* 亚马逊Amazon
* 阿里云
* 百度云
* 新浪SAE
* 其他

目前来说，Azure和Amazon是相对完善的云服务提供商。如果选择其他的云服务商，需有一定的评估，说明其优势和风险。

#### 系统架构
【给出系统架构说明和架构图。】
#### 可迁移性
系统方案应是可迁移的，不应被锁定在单一服务商。如迁移有风险和成本，需做出评估。
#### 数据存储
【估算数据存储量的需求。计算成本。如用存储云，可说明可伸缩性和对应的费用。】
#### 带宽和流量
【估算带宽和流量的需求，注意峰值的计算。计算成本。如用云，可说明可伸缩性和对应的费用。】
#### 备份和容灾
【需要有基本的备份方案。如用云，可说明对应的方案。】
#### 硬件配置
【说明所需硬件配置。如用云，说明云所需的CPU/内存等配置。】
#### SLA说明
【如用云，应说明可采纳的云服务商给出的服务品质协议。】
#### 维护方式
【针对所需日常维护或发生紧急事件时相关人和处置流程的说明。】
    
### 应用开发平台和技术栈

可选方案：
* LAMP（Linux + Apache + MySQL + PHP）或变种
* 基于微软技术的解决方案（Windows + IIS + ASP.NET）
* 各种基于 Java 的技术栈（企业应用采用较多）
* 基于 RoR（Ruby on Rails）的技术栈
* 基于 Python 的技术栈
* 基于 Node.js 的技术栈

如采用PaaS，本身对平台和技术栈有限制，须加以说明。

对于数据库、消息服务或其他独立服务，须单独加以说明。

#### 应用架构
【给出应用架构说明和架构图。如采用应用框架，须加以说明。】

#### 功能模块
【对应需求的具体功能模块的列表和图表。】

#### 所选用或依赖的第三方软件
【列出选用或依赖的第三方软件（包括库、框架、组件等），并说明其版权、许可方式、费用、维护方式等。宜采用成熟或有持续开发维护且可获得源码的第三方软件。对于应用来说关键的部分宜具有源码修改权。】

### 网站前端

【此为应用开发的一部分，但考虑到其重要性和独立性，宜单列说明。】

#### 前端架构
【前端方案相对较灵活，如采用较为复杂的前端方案，须加以说明。诸如资源流水线、SPA、大型应用框架（如AngularJS之类的）等。】

可选的前端资源构建系统：
* Gulp
* Brocolli
* FIS
* Grunt
* 其他（如RoR或Grails等应用框架下集成的构建系统） 

#### 跨设备方案
考虑到移动互联网的潮流，网站的设计开发也逐渐转向以手机和平板为优先。

可能的跨设备方案：
* 独立手机站
  为手机完全单独开发
* 设备适配
  将不同设备分类（如桌面、平板和手机），并为每类设备单独设计和开发表现层。
* 响应式设计（Responsive Design）
  响应式设计是一种新的网站设计潮流，它运用 HTML5 相关技术确保同一网页可以在多种设备上以较适合该设备的方式呈现，而不像以前为手机设备单独建立网站。
* 混合式
  结合设备适配和响应式设计两种方式
* 自动转换服务
  使用如云适配之类的第三方服务将为桌面设计的网页自动转换为适合其他设备访问

【根据本项目的情况，宜采用响应式设计或混合式】

#### 素材的知识产权
应列出所有使用的第三方素材（包括但不限于图片、字体、音乐、视频等）的知识产权归属，确保符合版权要求和使用许可。


### 视频解决方案
包含两个部分：

0. 部分视频放在合作视频网站上
   * 需能通过调用合作方的API集成
   
0. 自主视频服务
   * 此部分在系统架构上应具有独立性
   * 需支持视频转换为多种格式，适应不同码流和清晰度
   * 应有对存储、带宽、网速、流量等的估算

### 网站统计和分析
可选的网站统计和分析方案：
* Google Analysis
* 百度统计
* CNZZ统计

### SEO/SEM 等
【对网站统计、SEO、SEM等的说明。比如若采用SPA，如何解决SEO问题。】


## 网站安全要求

### 系统安全保障
【对系统安全性的说明。如用云，则说明相关云服务的安全性评估；如用自有设备托管服务，也要进行安全性说明。】

应符合媒体网站安全性相关标准。
在极端条件下应能即时关闭网站。

### 敏感数据加密
【如帐号相关部分。用户帐号密码存储应符合基本的安全性要求，比如hash加salt，而不是明文存储。至少用户登录部分宜采用SSL连接。】

### 数据留存和备份
【此为应对政策要求。】

### 用户隐私保障
【说明如何在技术上确保用户隐私策略，比如不被泄露给第三方。】


## 项目实施

### 项目开发过程模型

【对采用的软件工程模型做出说明，如 RUP、Scrum 等。并确定相关团队构成和合作方式。】

### 风险识别和管理策略

### 工程进度计划

### 软件质量控制方法
【比如测试方法、质量指标如测试覆盖率。】

## 项目验收标准
【对项目验收标准进行说明。验收标准须可量化。】

必须包括功能验收、性能验收、安全性验收。其中安全性验收委托第三方执行。除安全性验收之外的非功能性验收须提供必要的验收工具，比如性能测试工具。

### 培训计划
【对网站运营人员的培训计划。】

## 后续开发和维护

### 技术文档
应该要提供技术文档。

### 代码规范
应有代码规范。

### 源代码管理
应有源码管理，宜采用 svn/git 之类的源码管理软件。可获得源码库的完整权限，可查看历史版本。

### 代码、文档的所有权
代码和相关文档的所有权属于甲方。
