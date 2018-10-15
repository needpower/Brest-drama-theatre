import React from 'react';
import Link from 'mineral-ui/Link';
import { NavLink } from 'redux-first-router-link';

export default function Menu() {
  return (
    <div>
      <Link element={NavLink} to={{ type: 'EVENTS_LIST' }} exact>
        Афиша
      </Link>
      <Link element={NavLink} to={{ type: 'CHARACTERS' }} exact>
        Лица
      </Link>
      <Link element={NavLink} to={{ type: 'CONTACTS' }} exact>
        Контакты
      </Link>
    </div>
  );
}
