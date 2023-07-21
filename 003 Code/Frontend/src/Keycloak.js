import Keycloak from 'keycloak-js';
const KEYCLOAK_REALM_NAME = 'test-app';
const KEYCLOAK_CLIENT_ID = 'test-client';
const KEYCLOAK_URL = 'http://kjj.kjj.r-e.kr:8081/auth';
// // http://kjj.kjj.r-e.kr:8081/auth

const keycloak = new Keycloak({
  realm: KEYCLOAK_REALM_NAME,
  clientId: KEYCLOAK_CLIENT_ID,
  url: KEYCLOAK_URL,
});

export const initOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
};

// keycloak Event 를 보기 위한 함수 정의
// keycloak provider 의 onEvent 에 넣어준다.
export const onKeycloakEvent = (event, error) => {
  console.log('keycloak event ', event, error);
  switch (event) {
    case 'onAuthLogout':
      keycloak.logout();
      break;
    case 'onAuthRefreshError':
      keycloak.logout();
      break;
    case 'onAuthRefreshSuccess':
      console.log('auth token:  ' + keycloak.token);
      console.log('refresh token:  ' + keycloak.refreshToken);
      break;
    default:
      break;
  }
};

export default keycloak;
