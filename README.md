# 🎵 YT Music (Ad-Free)

<div align="center">

![YT Music Logo](https://img.shields.io/badge/YouTube%20Music-FF0000?style=for-the-badge&logo=youtube-music&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

**A lightweight Electron wrapper for YouTube Music with built-in ad blocking and media key support**

[![GitHub stars](https://img.shields.io/github/stars/Priyanshu84iya/yt-music-ads-free?style=social)](https://github.com/Priyanshu84iya/yt-music-ads-free/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Priyanshu84iya/yt-music-ads-free?style=social)](https://github.com/Priyanshu84iya/yt-music-ads-free/network/members)

</div>

## ✨ Features

🚫 **Ad-Free Experience**
- Blocks all YouTube Music ads using advanced filtering
- Removes premium upgrade prompts and banners
- Clean, distraction-free interface

🎮 **Media Key Support**
- Play/Pause with media keys
- Next/Previous track control
- Seamless keyboard integration

🔄 **Background Playback**
- Continues playing when minimized
- Uninterrupted music experience
- Smart audio management

🎨 **Enhanced Interface**
- Native desktop integration
- Customizable window controls
- Dark/Light theme support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Priyanshu84iya/yt-music-ads-free.git
   cd yt-music-ads-free
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

### Building for Distribution

```bash
npm run build
```

This will create distributable packages in the `dist/` directory.

## 🛠️ Technology Stack

- **Electron** - Cross-platform desktop framework
- **@cliqz/adblocker-electron** - Advanced ad blocking
- **electron-store** - Persistent settings storage
- **node-fetch** - HTTP requests for filter lists

## 📁 Project Structure

```
yt-music-ads-free/
├── src/
│   ├── main.js          # Main Electron process
│   ├── preload.js       # Preload script for web integration
│   └── adblock.js       # Ad blocking functionality
├── package.json         # Project configuration
└── README.md           # You are here!
```

## ⚙️ Configuration

The app uses multiple filter lists for comprehensive ad blocking:
- EasyList
- EasyPrivacy
- uBlock Origin filters
- Annoyances filters

Settings are automatically saved using `electron-store`.

## 🎹 Keyboard Shortcuts

| Action | Key |
|--------|-----|
| Play/Pause | `Media Play/Pause` |
| Next Track | `Media Next` |
| Previous Track | `Media Previous` |

## 🐛 Troubleshooting

### Common Issues

**App won't start**
- Ensure Node.js v16+ is installed
- Try deleting `node_modules` and running `npm install` again

**No sound/Audio issues**
- Check your system's default audio device
- Restart the application

**Ads still showing**
- The filter lists update automatically
- Try restarting the app to refresh filters

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes only. Please respect YouTube's Terms of Service.

## ⚠️ Disclaimer

This application is not affiliated with Google or YouTube. It's an independent project created for personal use and learning purposes.

---

<div align="center">

### 👨‍💻 Author

**Priyanshu Chaurasiya** *(aka Pry Uchiha)*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Priyanshu84iya/yt-music-ads-free)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/pry_uchiha)

*Made with ❤️ and ☕*

**If you found this project helpful, please give it a ⭐!**

</div>
