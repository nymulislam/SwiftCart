const loadNav = async () => {
    const res = await fetch('Navbar/navbar.html');
    const data = await res.text();
    document.getElementById('nav').innerHTML = data;
}

loadNav()