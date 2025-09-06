# 🌲 Sylvia & Tree Pixel Art Animation

## 项目概述

这是一个像素风格的动画项目，包含两个角色：
- **Sylvia**：黑长发、戴眼镜、穿白衬衫和格纹短裙，手持蓝色水壶
- **Tree Ghost**：白色幽灵状小树苗，黑色圆眼、腮红、头顶绿色叶子

## 文件结构

```
sylviaxiao/
├── pixel-art.html          # 基础像素艺术展示
├── spritesheet.html        # 完整动画spritesheet
├── pixel-animation.css     # CSS动画样式
├── pixel-animation.js      # JavaScript动画控制器
└── README.md              # 使用说明
```

## 技术规格

### Sylvia角色
- **尺寸**：64×64像素
- **动画帧数**：8帧
- **总spritesheet尺寸**：512×64像素
- **风格**：16-bit像素艺术（RPG Maker/Undertale风格）

### Tree Ghost角色
- **尺寸**：32×32像素
- **动画帧数**：4帧
- **总spritesheet尺寸**：128×32像素

## 动画序列

### Sylvia浇水动画（8帧）
1. **Frame 1**：静止状态，水壶垂直
2. **Frame 2**：开始倾斜水壶（15°）
3. **Frame 3**：继续倾斜（30°）
4. **Frame 4**：最大倾斜角度（45°）
5. **Frame 5**：开始回正（30°）
6. **Frame 6**：继续回正（15°）
7. **Frame 7**：回到垂直位置
8. **Frame 8**：静止状态

### Tree Ghost开心动画（4帧）
1. **Frame 1**：正常状态
2. **Frame 2**：轻微放大（1.05倍）
3. **Frame 3**：最大放大（1.1倍）
4. **Frame 4**：回到正常状态

## 使用方法

### 1. 基础HTML使用

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="pixel-animation.css">
</head>
<body>
    <div class="animation-scene">
        <div class="sylvia-character sylvia-watering"></div>
        <div class="tree-character tree-happy"></div>
        <div class="water-drop"></div>
    </div>
    
    <script src="pixel-animation.js"></script>
</body>
</html>
```

### 2. CSS动画控制

```css
/* 播放Sylvia浇水动画 */
.sylvia-watering {
    animation: sylviaWatering 2s ease-in-out infinite;
}

/* 播放Tree开心动画 */
.tree-happy {
    animation: treeHappy 1s ease-in-out infinite;
}

/* 水滴下落动画 */
.water-drop {
    animation: waterDrop 0.8s linear infinite;
}
```

### 3. JavaScript控制

```javascript
// 初始化动画控制器
const animation = new PixelAnimationController();

// 播放/暂停动画
animation.toggleAnimation();

// 设置特定帧
animation.setFrame(3);

// 下载spritesheet
animation.downloadSpritesheet();
```

## 自定义选项

### 动画速度调整
```css
.sylvia-watering {
    animation-duration: 1.5s; /* 调整动画速度 */
}
```

### 响应式设计
```css
@media (max-width: 768px) {
    .sylvia-character {
        width: 48px;
        height: 48px;
    }
}
```

### 无障碍支持
```css
@media (prefers-reduced-motion: reduce) {
    .sylvia-watering,
    .tree-happy {
        animation: none;
    }
}
```

## 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 性能优化

1. **图片优化**：使用PNG格式，启用像素化渲染
2. **动画优化**：使用CSS transforms而非改变background-position
3. **内存管理**：及时清理动画定时器

## 扩展功能

### 添加新动画
```javascript
// 在PixelAnimationController中添加新方法
addCustomAnimation(name, frames, duration) {
    // 自定义动画逻辑
}
```

### 交互功能
```javascript
// 点击触发动画
document.addEventListener('click', () => {
    animation.startAnimation();
});
```

## 故障排除

### 常见问题

1. **动画不播放**
   - 检查CSS文件是否正确加载
   - 确认浏览器支持CSS动画

2. **图片模糊**
   - 添加 `image-rendering: pixelated;`
   - 检查图片尺寸设置

3. **性能问题**
   - 减少动画帧数
   - 使用 `will-change` 属性优化

## 许可证

MIT License - 可自由使用和修改

## 联系方式

如有问题或建议，请联系：selunaxiao@gmail.com

---

*Created with ❤️ for Sylvia's academic website*