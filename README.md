# Stable Diffusion Node JS

This application is a Node JS server that will make an API Request to Stable Diffusion.

## Docker

1. Execute the following command:

```sh
$ git clone https://github.com/anthonywong555/Stable-Diffusion-SMS
$ cd Stable-Diffusion-SMS
$ npm install
$ cp .env-example .env
```

2. Put all your credentials in the **.env** file.

3. Execute the following command:

```sh
docker compose -f "docker-compose.dev.yml" up -d --build
```

1. Send a POST request to `localhost:8080/generate`


```json
{
    "prompt": "Shiba Inu wearing a top hat."
}
```

## Render

1. Fork this repo and click the button below to try it out!

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

2. In the Dashboard click on your `Stable Diffusion Service`.
3. Click on Environment.
4. Add the following Environment Variables:

| Key                 | Value |
|---------------------|-------|
| PRODUCTION_BASE_URL |Render URL|
| DREAMSTUDIO_API_KEY |[API Key](https://beta.dreamstudio.ai/membership)|