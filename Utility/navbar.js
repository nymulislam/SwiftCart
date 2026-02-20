const loadNav = async () => {
    const res = await fetch('Utility/navbar.html');
    const data = await res.text();
    document.getElementById('nav').innerHTML = data;
}

loadNav()