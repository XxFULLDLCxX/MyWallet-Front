import { useEffect, useRef } from 'react';

export default function VerifyAuth({ user, children }) {
  let countRef = useRef(0);
  if (!user) {
    useEffect(() => {
      if (++countRef.current === 2) alert('Usuário não logado!');
    }, []);
  }
  return <>{!user ? <h1>Verificando...</h1> : children}</>;
}
