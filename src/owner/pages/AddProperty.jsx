// AddProperty.jsx — Dedicated page that pre-opens the add form
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyProperties from './MyProperties';

/**
 * This page renders MyProperties but auto-triggers the Add Property form.
 * We pass a signal via sessionStorage so MyProperties opens showForm=true on mount.
 */
export default function AddProperty() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('owner_open_add_form', '1');
  }, []);

  return <MyProperties autoOpenForm />;
}
