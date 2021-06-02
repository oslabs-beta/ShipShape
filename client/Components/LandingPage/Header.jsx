import React from 'react';
import Logo from './Logo.jsx';
import GithubLink from './GithubLink.jsx';

export default function Header() {
  return (
    <div className="headerDiv">
      <Logo />
      <GithubLink />
    </div>
  );
}
