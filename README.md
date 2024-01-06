# React 音樂播放介面

### demo
<a target="_blank" href="https://music.yangisgood.com/">https://music.hihiyang.com</a>

![demo image](https://imgur.com/Qa4MHnR.jpg)

### 說明
仿 Spotify 音樂播放介面，音樂來源是使用官方 Youtube 連結，功能為播放音樂、搜尋專輯歌曲、新增歌曲至收藏庫、調整聲音大小與播放上/下一首歌曲。

### 架構
![diagram](https://imgur.com/uLDPghl.jpg)
#### 版面構成
* NarBar 左邊側邊欄
* Main 中間主要區塊
* Player 底部播放器介面

#### 頁面構成
* Search 搜尋頁面
* Home 首頁推薦列表
* Collection 我的收藏庫
* PlayList 自訂歌曲清單
* Album 專輯歌曲清單

#### Component 思路
1. Player 切分為 5 個 Component，各自負責自己的功能，讓整體程式開發調整更加容易且效率較高。
2. 歌曲列表使用的重複性高，所以拆出 Component，List Data 適合寫成一個 Component，來減少重複程式碼的發生。

### 技術
* React
* React-Player
* React-Redux
* Redux-Toolkit
* Styled-Components

### how to start
* `npm install`
* `npm start`
