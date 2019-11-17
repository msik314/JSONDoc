async function loadJson(file) {
    const response = await fetch(file);
    const json = await response.json();
    return json;
}

function renderStyle(element, json)
{
    const keys = Object.keys(json);
    let styleStr="";
    for(let i in keys) {
        const key = keys[i];
        const data = json[key];
        if(key === ".") continue;
        else {
            const dataKeys = Object.keys(data);
            styleStr += key + "{";
            for(let j in dataKeys)
            {
                const dk = dataKeys[j];
                const ddk = data[dk];
                if(ddk instanceof Array) {
                    styleStr += dk + ":" + ddk.join(" ") + ";";
                }
                else {
                    styleStr += dk + ":" + ddk.toString() + ";";
                }
            }
            styleStr += "}";
        }
    }
    element.innerHTML = styleStr;
}

function render(element, json,clear, id) {
    if (clear) element.innerHTML="";
    if(id !== undefined) element.id = id;
    const keys = Object.keys(json);
    for(let i in keys) {
        const key = keys[i];
        const data = json[key];
        if(key === "." || key === id) continue;
        else if(key === "class") {
            if(data instanceof Array) {
                element.className=data.join(" ");
            }
            else {
                element.className=data.toString();
            }
        }
        else if(key === "_") element.innerText=data.toString();
        else if(data instanceof Array) {
            for(let j = 0; j < data.length; ++j) {
                const child = document.createElement(data[j]["."]);
                element.appendChild(child);
                if(data[j]["."] === "style") {
                    renderStyle(child, data[j]);
                }
                else{
                    render(child, data[j], clear);
                }
            }
        }
        else if(typeof(data) === "object") {
            const child = document.createElement(data["."]);
            element.appendChild(child);
            if(data["."] === "style") {
                renderStyle(child, data);
            }
            else{
                render(child, data, clear, key);
            }
        }
        else element.setAttribute(key,data.toString());
    }
}

function renderHead(json, clear) {
    if(json.head!==undefined) render(document.getElementsByTagName("head")[0], json.head, clear);
}

function renderBody(json, clear) {
    if(json.body!==undefined) render(document.getElementsByTagName("body")[0], json.body, clear);
}


async function renderJSON(pageSrc, clear = false){
    const page = await loadJson(pageSrc);
    renderHead(page, clear);
    renderBody(page, clear);

    document.dispatchEvent(new Event("onJsonLoad"));
};
