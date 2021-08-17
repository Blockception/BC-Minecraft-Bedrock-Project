# Blockception Minecraft Bedrock Project

[![Npm Package & Publish](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-publish.yml)
[![Npm Test](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-test.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-test.yml)
[![tagged-release](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/tagged-release.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/tagged-release.yml)  
![npm](https://img.shields.io/npm/v/bc-minecraft-project)

A project that deals with caching, summarizing minecraft bedrock data

```ts
const Data = new ProjectData();

const ProjectFolder = "c:\\project\\";
const manifests = ["c:\\project\\bp\\manifest.json", "c:\\project\\rp\\manifest.json", "c:\\project\\world\\manifest.json"];

Data.addPack(manifests, ProjectFolder);

//Process documents into the pacts
Data.Process();
```
