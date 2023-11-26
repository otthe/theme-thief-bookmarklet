javascript:(function(){
    const uniqueBackgroundColors = new Set();
    const uniqueTextColors = new Set();
    const uniqueFontFamilies = new Set();

    let textMode = false;

    if (document.getElementById('color-container')) {
        document.getElementById('color-container').remove();
        uniqueBackgroundColors.clear();
        uniqueTextColors.clear();
        uniqueFontFamilies.clear();
    }

    function copyToClipboard(text) {
        if (text === '' || text === undefined) return;
        navigator.clipboard.writeText(text).then(() => {
            console.log(text);
            showCopiedNotification();
        });
    }

    function showCopiedNotification() {
        let notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.transition = 'opacity 0.5s ease';
    
        document.body.appendChild(notification);
    
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 1000);
    
        setTimeout(() => {
            notification.remove();
        }, 1500);
    }

    function createPopup() {
        let popup = document.createElement('div');
        popup.style.backgroundColor = 'white';
        popup.style.padding = '10px';
        popup.style.border = '1px solid black';
        popup.style.maxHeight = '400px';
        popup.style.maxWidth = '220px';
        popup.style.overflowY = 'auto';
        popup.style.overflowX = 'auto';

        return popup;
    }

    function createContainer() {
        let container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.right = '10px';
        container.style.zIndex = '9999';
        container.style.backgroundColor = '#a9b9d1';
        container.style.padding = '10px';
        container.style.border = '1px solid black';
        container.style.maxHeight = '480px';
        container.style.maxWidth = '720px';
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.paddingBottom = '30px';
        
        container.setAttribute('id', 'color-container');

        container.style.fontFamily = 'Arial, Helvetica, sans-serif';
        container.style.fontSize = '20px';

        return container;
    }

    function createTitle(title) {
        let titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.style.fontFamily = 'Arial, Helvetica, sans-serif';
        titleElement.style.fontSize = '20px';
        titleElement.style.color = 'black';
        return titleElement;
    }

    function createColorSwatch(color) {
        let colorSwatch = document.createElement('div');
        colorSwatch.style.height = '20px';
        colorSwatch.style.marginBottom = '5px';
        colorSwatch.style.backgroundColor = color;
        colorSwatch.title = 'Click to copy ' + color;
        colorSwatch.style.border = '1px solid black';
        colorSwatch.onclick = () => copyToClipboard(color);

        colorSwatch.setAttribute('class', 'color-swatch');

        if(textMode) {
            colorSwatch.style.fontSize = '12px';
            colorSwatch.style.fontFamily = 'Arial, Helvetica, sans-serif';
            colorSwatch.style.lineHeight = '12px';
            colorSwatch.style.textAlign = 'center';
            colorSwatch.style.color = 'black';
            colorSwatch.style.textShadow = '1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white';
    
            colorSwatch.innerHTML = color;
        }


        colorSwatch.onmouseover = () => {
            colorSwatch.style.cursor = 'pointer';
        }

        return colorSwatch;
    }

    function createFontFamily(fontFamily) {
        if (fontFamily === '') return;

        let fontFamilyElement = document.createElement('div');
        fontFamilyElement.style.fontFamily = fontFamily;
        fontFamilyElement.style.fontSize = '20px';
        fontFamilyElement.style.marginBottom = '5px';
        fontFamilyElement.textContent = fontFamily;
        fontFamilyElement.title = 'Click to copy ' + fontFamily;
        fontFamilyElement.style.border = '1px solid black';
        fontFamilyElement.onclick = () => copyToClipboard(fontFamily);
        fontFamilyElement.style.color = 'black';

        fontFamilyElement.onmouseover = () => {
            fontFamilyElement.style.cursor = 'pointer';
        }

        return fontFamilyElement;
    }

    function createButton(text, top, bot, left, right, bgColor) {
        let button = document.createElement('button');
        button.textContent = text;
        button.style.position = 'absolute';
        button.style.top = top;
        button.style.bottom = bot;
        button.style.left = left;
        button.style.right = right;
        button.style.zIndex = '10000';
        button.style.height = '30px';
        button.style.backgroundColor = bgColor;
        button.style.border = '1px solid black';
        button.style.borderRadius = '5px';
        button.style.color = 'white';
        button.style.fontFamily = 'Arial, Helvetica, sans-serif';
        button.style.fontSize = '16px';
        button.style.padding = '0px 10px';

        button.onmouseover = () => {
            button.style.cursor = 'pointer';
        }
        return button;
    }

    function downloadAsJSON() {
        let data = {
            'backgroundColors': Array.from(uniqueBackgroundColors),
            'textColors': Array.from(uniqueTextColors),
            'fontFamilies': Array.from(uniqueFontFamilies)
        };
    
        let formattedData = JSON.stringify(data, null, 4);
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(formattedData);
        let dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "theme.json");
        dlAnchorElem.click();
    }

    document.querySelectorAll('*').forEach(element => {
        let computedStyle = window.getComputedStyle(element);
    
        let textColor = computedStyle.getPropertyValue('color');
        let backgroundColor = computedStyle.getPropertyValue('background-color');
        let fontFamily = computedStyle.getPropertyValue('font-family');
    
        uniqueTextColors.add(textColor);
        uniqueBackgroundColors.add(backgroundColor);
        uniqueFontFamilies.add(fontFamily);
    });

    let bgColorPopup = createPopup();
    let textColorPopup = createPopup();
    let fontFamilyPopup = createPopup();

    let mainContainer = createContainer();

    bgColorPopup.appendChild(createTitle('Background colors'));
    textColorPopup.appendChild(createTitle('Other colors'));
    fontFamilyPopup.appendChild(createTitle('Font families'));

    uniqueBackgroundColors.forEach(color => {
        bgColorPopup.appendChild(createColorSwatch(color));
    });

    uniqueTextColors.forEach(color => {
        textColorPopup.appendChild(createColorSwatch(color));
    });

    uniqueFontFamilies.forEach(fontFamily => {
        fontFamilyPopup.appendChild(createFontFamily(fontFamily));
    });

    mainContainer.appendChild(bgColorPopup);
    mainContainer.appendChild(textColorPopup);
    mainContainer.appendChild(fontFamilyPopup);

    containerCloseButton = createButton('Close', 'auto', '0px', 'auto', '10px', '#cf0502');
    containerDownloadButton = createButton('Download as JSON', 'auto', '0px', '10px', 'auto', '#0273cf');
    containerTextModeButton = createButton('Text mode', 'auto', '0px', '240px', 'auto', '#d3d618');

    containerDownloadButton.onclick = () => downloadAsJSON();

    containerCloseButton.onclick = () => mainContainer.remove();

    containerTextModeButton.onclick = () => {
        textMode = !textMode;
        
        if(textMode) {
            document.querySelectorAll('.color-swatch').forEach(element => {
                element.style.fontSize = '12px';
                element.style.fontFamily = 'Arial, Helvetica, sans-serif';
                element.style.lineHeight = '12px';
                element.style.textAlign = 'center';
                element.style.color = 'black';
                element.style.textShadow = '1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white';

                let newTitle = element.title.split(' ').slice(3).join(' ');
                element.innerHTML = newTitle;
            });
        } else {
            document.querySelectorAll('.color-swatch').forEach(element => {
                element.style.fontSize = '20px';
                element.style.fontFamily = 'Arial, Helvetica, sans-serif';
                element.style.lineHeight = '20px';
                element.style.textAlign = 'left';
                element.style.color = element.style.backgroundColor;
                element.style.textShadow = 'none';
        
                element.innerHTML = '';
            });
        }
    }

    mainContainer.appendChild(containerCloseButton);

    mainContainer.appendChild(containerDownloadButton);

    mainContainer.appendChild(containerTextModeButton);

    document.body.appendChild(mainContainer);
})();