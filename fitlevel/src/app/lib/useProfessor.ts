// lib/useProfessor.ts
"use client";

import { useEffect, useState } from "react";

export function useProfessor() {
  const [professor, setProfessor] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("professor");
    if (data) setProfessor(JSON.parse(data));
  }, []);

  return professor;
}
