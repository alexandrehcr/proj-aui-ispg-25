import React from 'react';
import './style.css';
import './modal.css';
import './form.css';

function Header() {
    return (
        <header>
            <div className="title">Dear Me</div>
            <div className="search">
                <form action="/index.jsx" method="GET">
                    <label htmlFor="site-search" className="sr-only"></label>
                    <input type="search" placeholder="Procurar Post..." id="site-search" name="q" />
                    <button type="submit"></button>
                </form>
            </div>
        </header>   
    );
}

function no_posts () {
    return (
        <div id="no-posts"></div>
    );
}

function posts_lists() {
    return (
        <div id="posts-list"></div>
    );
}   