import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const NavBar = () => {
  const navigate = useNavigate();

  return (
      <div>
        Add Navigation Bar
      </div>
  );
};

export default NavBar;