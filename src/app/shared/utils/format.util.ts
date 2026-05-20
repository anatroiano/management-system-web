export function formatPhone(phone?: string): string {
    if (!phone) {
        return '-';
    }

    const value = phone.replace(/\D/g, '');
    if (value.length === 11) {
        return value.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            '($1) $2-$3'
        );
    }

    if (value.length === 10) {
        return value.replace(
            /^(\d{2})(\d{4})(\d{4})$/,
            '($1) $2-$3'
        );
    }

    return phone;
}

export function formatDocument(document?: string): string {
    if (!document) {
        return '-';
    }

    const value = document.replace(/\D/g, '');

    if (value.length === 11) {
        return value.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
        );
    }

    if (value.length === 14) {
        return value.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
        );
    }

    return document;
}