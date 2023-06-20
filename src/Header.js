function Header (props) {
    return (
        <header id={props.darkMode ? "dark" : ""}>
            <h2>Todo app</h2>
            <input type="button" value="Toggle dark mode" onClick={props.toggleDarkMode} />
        </header>
    )
}

export default Header;