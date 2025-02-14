export function setPageData(data){
    // console.log(data);
    if(data.title){
        document.title = data.title;
        document.querySelector('meta[name="title"]').setAttribute("content", data.title);
    }
    if(data.description){
        document.querySelector('meta[name="description"]').setAttribute("content", data.description);
    }
    if(data.linkTag){
        if(data.linkTag.rel == 'canonical'){
            document.querySelector('link[rel="canonical"]').setAttribute("href", data.linkTag.href);
        }
    }
    if(data.ogData){
        if(data.ogData.title){
            if(document.querySelector('meta[property="og:title"]')){
                document.querySelector('meta[property="og:title"]').setAttribute("content", data.ogData.title);
            }else{
                const metaTag = document.createElement('meta');
                metaTag.setAttribute('property', 'og:title');
                metaTag.content = data.ogData.title;
                document.head.appendChild(metaTag);
            }
        }
        if(data.ogData.type){
            if(document.querySelector('meta[property="og:type"]')){
                document.querySelector('meta[property="og:type"]').setAttribute("content", data.ogData.type);
            }else{
                const metaTag = document.createElement('meta');
                metaTag.setAttribute('property', 'og:type');
                metaTag.content = data.ogData.type;
                document.head.appendChild(metaTag);
            }
        }
        if(data.ogData.url){
            if(document.querySelector('meta[property="og:url"]')){
                document.querySelector('meta[property="og:url"]').setAttribute("content", data.ogData.url);
            }else{
                const metaTag = document.createElement('meta');
                metaTag.setAttribute('property', 'og:url');
                metaTag.content = data.ogData.url;
                document.head.appendChild(metaTag);
            }
        }
        if(data.ogData.image){
            if(document.querySelector('meta[property="og:image"]')){
                document.querySelector('meta[property="og:image"]').setAttribute("content", data.ogData.image);
            }else{
                const metaTag = document.createElement('meta');
                metaTag.setAttribute('property', 'og:image');
                metaTag.content = data.ogData.image;
                document.head.appendChild(metaTag);
            }
        }
        if(data.ogData.description){
            if(document.querySelector('meta[property="og:description"]')){
                document.querySelector('meta[property="og:description"]').setAttribute("content", data.ogData.description);
            }else{
                const metaTag = document.createElement('meta');
                metaTag.setAttribute('property', 'og:description');
                metaTag.content = data.ogData.description;
                document.head.appendChild(metaTag);
            }
        }
    }
}