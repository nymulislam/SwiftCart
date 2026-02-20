const footer = async () => {
    const res = await fetch("Utility/footer.html")
    const data = await res.text();
    document.getElementById("footer").innerHTML = data ;
}

footer()