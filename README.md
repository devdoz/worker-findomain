# 域名查询数据

**findomain** 项目域名信息数据服务。保存到域名查询信息到 `CloudFlare Workers KV`。

## 说明

相关的 JSON 数据格式参考主项目 **idevsig/findomain** / **idev/findomain** README。

**接口**
格式均为 JSON 类型
||方法|说明|
|:---|:---|:---|
|`/domain`|GET|读取数据|
|`/domain`|POST|更新数据|

## 部署教程

### 通过 GitHub Actions 发布至 CloudFlare

1. 从 CloudFlare 获取 `CLOUDFLARE_API_TOKEN` 值，并设置到项目。

   > `https://github.com/<ORG>/<REPO>/settings/secrets/actions`

2. 可选）。设置`别名`。创建 `KV`、，并绑定到此 Workers 服务。
   - 2.1a 手动后台绑定，（`Settings` -> `Variables` -> `KV Namespace Bindings` -> `Add binding` -> `Variable name (data)`, `选择创建的 KV`）
   - 2.1b 通过命令行创建。按照**本地部署**的第 6 步，创建和保存 `KV`

### 本地部署到 CloudFlare

1. 注册 [CloudFlare 账号](https://www.cloudflare.com/)，并且设置 **Workers** 域名 (比如：`xxx.workers.dev`)

2. 安装 [Wrangler 命令行工具](https://developers.cloudflare.com/workers/wrangler/)。
   ```bash
    npm install -g wrangler
   ```
3. 登录 `Wrangler`（可能需要扶梯）：

   ```bash
   # 若登录不成功，可能需要使用代理。
   wrangler login
   ```

4. 拉取本项目,并进入该项目目录：

   ```bash
   git clone https://github.com/servless/worker-findomain.git
   cd worker-findomain
   ```

5. 修改 `wrangler.toml` 文件中的 `name`（proj）为服务名 `xxx`（访问域名为：`proj.xxx.workers.dev`）

6. 创建 **Workers** 和 **KV**，并绑定 `KV` 到 `Workers`

   1. **创建 KV，并设置 domain 值**

      1. 创建名为 `data` 的 `namespace`

         ```bash
            wrangler kv:namespace create data
         ```

         得到

         ```bash
            ⛅️ wrangler 2.15.1
            --------------------
            🌀 Creating namespace with title "findomain-data"
            ✨ Success!
            Add the following to your configuration file in your kv_namespaces array:
            { binding = "data", id = "c63f7dad63014a70847d96b900a4fc3f" }
         ```

         将上述命令得到的 `kv_namespaces` 保存到 `wrangler.toml` 中，即

         ```bash
            # 替换当前项目该文件内相关的数据，即只需要将 id 的值替换为上一步骤得到的值
            kv_namespaces = [
            { binding = "data", id = "c63f7dad63014a70847d96b900a4fc3f" }
            ]
         ```

   2. 将 `data` 值保存到 `KV namespace`

      ```bash
         wrangler kv:key put --binding=data 'data' '{}'
      ```

7. 发布

   ```bash
    wrangler deploy
   ```

   发布成功将会显示对应的网址

   ```bash
    Proxy environment variables detected. We'll use your proxy for fetch requests.
   ⛅️ wrangler 2.13.0
        --------------------
        Total Upload: 0.66 KiB / gzip: 0.35 KiB
        Uploaded proj (1.38 sec)
        Published proj (4.55 sec)
                https://proj.xxx.workers.dev
        Current Deployment ID:  xxxx.xxxx.xxxx.xxxx
   ```

## 仓库镜像

- https://git.jetsung.com/servless/worker-findomain
- https://framagit.org/servless/worker-findomain
- https://github.com/servless/worker-findomain
