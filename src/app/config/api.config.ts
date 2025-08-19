export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me'
  },
  MEDECIN: {
    BASE: '/api/medecin',
    ALL: '/api/medecin/all',
    BY_ID: '/api/medecin/{id}',
    CREATE: '/api/medecin/save',
    UPDATE: '/api/medecin/{id}',
    DELETE: '/api/medecin/{id}'
  },
  PATIENT: {
    BASE: '/api/patients',
    ALL: '/api/patients/all',
    BY_ID: '/api/patients/{id}',
    CREATE: '/api/patients/save',
    UPDATE: '/api/patients/update/{id}',
    DELETE: '/api/patients/{id}'
  },
  SECRETAIRE: {
    BASE: '/api/secretaire',
    ALL: '/api/secretaire/all',
    BY_ID: '/api/secretaire/{id}',
    CREATE: '/api/secretaire/save',
    UPDATE: '/api/secretaire/{id}',
    DELETE: '/api/secretaire/{id}'
  },
  PRESCRIPTION: {
    BASE: '/api/prescription',
    ALL: '/api/prescription/all',
    BY_ID: '/api/prescription/{id}',
    CREATE: '/api/prescription/create',
    UPDATE: '/api/prescription/update/{id}',
    DELETE: '/api/prescription/delete/{id}',
    BY_RDV: '/prescription/by-rendezvous/{rendezvousId}',
    DOWNLOAD_PDF: '/prescription/{id}/pdf'
  },
  RENDEZVOUS: {
    BASE: '/api/rendezvous',
    ALL: '/api/rendezvous/all',
    BY_ID: '/api/rendezvous/{id}',
    CREATE: '/api/rendezvous/create',
    UPDATE: '/api/rendezvous/update/{id}',
    DELETE: '/api/rendezvous/delete/{id}',
    CANCEL: '/api/rendezvous/cancel/{id}',
    UPCOMING: '/api/rendezvous/all/upcoming',
    BETWEEN_DATES: '/api/rendezvous/between-dates',
    SEARCH: '/api/rendezvous/all/search'
  },
  CHAT: {
    BASE: '/api/chat',
    CONVERSATION: '/api/chat/conversation/{otherUserId}',
    UNREAD: '/api/chat/unread',
    UNREAD_COUNTS: '/api/chat/unread/counts'
  },
  WEBSOCKET: {
    URL: 'ws://localhost:8080/ws'
  }
}; 