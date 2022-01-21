/*
    Mafee7 Lizva
*/

const lizva = {};
let parsedpage = "";
let lizvprops = [];
let lizv = (prop, html) => {
    parsedpage = parsedpage.replaceAll(prop, html);
    document.body.innerHTML = parsedpage;
    lizvprops.push({
        "prop": prop,
        "html": html
    });
};

const render = () => {
    document.body.innerHTML = parsedpage;
};

const load = (page, main) => {
    fetch(`/pages/${page}/${main}`).then(res => res.text().then(res => { res;
        parsedpage = res;

        document.title = parsedpage.substring(parsedpage.indexOf("<title") + 6, parsedpage.indexOf("title>"));
        lizv("<title", "");
        lizv("title>", "");
        
        lizv("[bold]", "<span style='font-weight: 600'>");
        lizv("[>bold]", "</span>");
        lizv("[underline]", "<span style='text-decoration: underline;'>");
        lizv("[>underline]", "</span>");

        lizv("<2em>", "<span style='font-size: 2em'>");
        lizv("<3em>", "<span style='font-size: 3em'>");
        lizv("<5em>", "<span style='font-size: 5em'>");
        lizv("</2em>", "</span>");
        lizv("</3em>", "</span>");
        lizv("</5em>", "</span>");
        lizv("<centr>", `<div class="lizv-centr">
        <style>.lizv-centr{display: flex; align-items: center; justify-content: center; width: 100vw; height: 100vh;} .lizv-centrdiv{width: auto; height: auto;}
        </style>
        <div class="lizv-centrdiv">
        `);

        lizv("</centr>", "</div> </div>");

        lizv("<darkmode>", `<div class="lizv-darkmode">
        <style>
            .lizv-darkmode *{
                color: white;
                background-color: rgb(34, 34, 34);
            }
        </style>
        `);

        lizv("</darkmode>", "</div>");

        lizv("[box]{round, 1pxborder}", `<div class='lizv-box-round'>
            <style> 
                .lizv-box-round{
                    padding: 3vh;
                    border-radius: 0.8vh;
                    border: 3px solid white;
                }
            </style>
        `);

        lizv("[>box]", "</div>");

        fetch("/lizva/lizload.html").then(lizload => {lizload.text().then(lizload => {
            document.body.innerHTML = lizload;
            setTimeout(() => {
                document.body.innerHTML = parsedpage;
            }, 2000);
        })});

        return res;
    }));
};

if(lizconf){
    let pages = lizconf.pages.map(p => {
        load(p.page, p.main);
    });
} else {
    console.warn(`lizva config not found, trying again`);
    setTimeout(() => {
        if(!lizconf) console.error("error while loading lizva config");
    });
}

setTimeout(() => {
    console.clear();
    console.log(`%cWebsite Running Lizva v1`, `font-size: 3 vh; color: black; padding: 2vh; border-radius: 2vh; background-color: lime;`);
    lizconf.pages.map(p => {
        if(p.overflowblock){
            document.body.style.overflow = "hidden"
        } 

        if(p.nomargin){
            document.body.style.margin = "0";
        }

        if(p.favicon){
            document.head.innerHTML += `<link href='/pages/${p.page}/${p.favicon}' rel='icon'>`;
        }
    });
}, 1000);
