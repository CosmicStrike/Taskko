"use strict";

// Main Entry
document.addEventListener('DOMContentLoaded', (e) => {
    // navbar
    document.getElementById('menu').addEventListener('click', (e) => {
        document.getElementsByClassName('open')[0].classList.toggle('hide');
        document.getElementsByClassName('close')[0].classList.toggle('hide');
        document.getElementsByClassName('navbar')[0].classList.toggle('hide');
    })

    // It will set system/os default theme
    UpdateTheme()

    // Add event listeners to change the theme on user input
    document.getElementById('light').addEventListener('click', (e) => {
        UpdateTheme('light');
    })
    document.getElementById('dark').addEventListener('click', (e) => {
        UpdateTheme('dark');
    })
});


function UpdateTheme(customTheme = null) {
    //theme
    // themeOs - true = dark, false = light
    const themeOs = window.matchMedia('(prefers-color-scheme: dark)').matches

    // themePref - (null or light) or (dark)
    const themePref = window.localStorage.getItem('theme');

    let lightMode = document.getElementById('light');
    let darkMode = document.getElementById('dark');
    let theme;
    if (customTheme === null) {
        if (themePref === null) {
            // GO with OS
            if (themeOs) {
                // Dark Mode
                lightMode.classList.remove('hide');
                darkMode.classList.add('hide');
                theme = 'dark';
                document.getElementsByTagName('meta')["color-scheme"].content = 'dark'
            }
            else {
                // Light Mode
                lightMode.classList.add('hide');
                darkMode.classList.remove('hide');
                theme = 'light';
                document.getElementsByTagName('meta')["color-scheme"].content = 'light'
            }
        }
        else {
            // GO with preference saved
            if (themePref === 'dark') {
                // Dark Mode
                lightMode.classList.remove('hide');
                darkMode.classList.add('hide');
                theme = 'dark';
                document.getElementsByTagName('meta')["color-scheme"].content = 'dark'
            }
            else {
                // Light Mode
                lightMode.classList.add('hide');
                darkMode.classList.remove('hide');
                theme = 'light';
                document.getElementsByTagName('meta')["color-scheme"].content = 'light'
            }
        }
    }
    else {
        if (customTheme === 'dark') {
            theme = 'dark';
            lightMode.classList.remove('hide');
            darkMode.classList.add('hide');
            document.getElementsByTagName('meta')["color-scheme"].content = 'dark'
        }
        else {
            theme = 'light';
            lightMode.classList.add('hide');
            darkMode.classList.remove('hide');
            document.getElementsByTagName('meta')["color-scheme"].content = 'light'
        }
    }
    // documentElemet will return the root element i.t <html>
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
}