import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next
): Observable<HttpEvent<unknown>> => {
  // Verificar si la URL actual necesita el token
  // Excluir URLs de login y autenticación externa (no añadir Authorization header)
  const shouldExcludeToken = req.url.includes('/login/') || req.url.includes('/external-login/');

  // Si la URL está excluida, continuar sin añadir headers
  if (shouldExcludeToken || !localStorage.getItem('token')) {
    return next(req);
  }

  // Si hay token y la URL no está excluida, añadir el token
  const token = localStorage.getItem('token');
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Token ${token}`,
    },
  });

  return next(cloned);
};
