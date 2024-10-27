import { UserResponse } from "../models/user-response";

export class Utils {
    static downloadPdf(data: Blob, fileName: string): void {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    static getUser(): UserResponse {
        const user = localStorage.getItem('user');
        if(user) {
            return JSON.parse(user);
        } else {
            return {};
        }
    }
}