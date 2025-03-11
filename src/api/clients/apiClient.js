import axios from 'axios';
import {serverURL} from '../../utility/URL'

// API Client for JSON requests
export const jsonApiClient = axios.create({
    baseURL: serverURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API Client for File Uploads
export const fileApiClient = axios.create({
    baseURL: serverURL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
