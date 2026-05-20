// Ruan
export async function authRuan() {
    const res = await fetch("https://api-apostadores-fight-azure.vercel.app/login", {
        method: "POST",   
        body: JSON.stringify({
            "usuario": "admin",
            "senha": "123"
        })
    })
    const json = await res.json()
    return json.token
}

// Foguinho

// Vitor

// Duduzao
export async function authDuduzao(){
    const res = await fetch("https://api-aposta-lutas.vercel.app/auth/login", {
        method: "POST",
        body: JSON.stringify({
            "usuario": "bet3M",
            "senha": "bet3MM"
        })
    })
    const json = await res.json()
    return json.token
}

// Gustav
const API_LUTADORES = 'https://lutadores-api-22f61a69f511.herokuapp.com';
let _privateKey = null;
let _servidorPublicKey = null;

export async function generateKey(){
    const res = await fetch(`${API_LUTADORES}/chave-publica`);
    const { publicKey: spkiB64 } = await res.json();
    const spkiBytes = Uint8Array.from(atob(spkiB64), c => c.charCodeAt(0));
    _servidorPublicKey = await crypto.subtle.importKey(
        'spki', spkiBytes, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']
    );

    const kp = await crypto.subtle.generateKey(
        { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1,0,1]), hash: 'SHA-256' },
        true, ['encrypt', 'decrypt']
    );
    _privateKey = kp.privateKey;

    const spki = await crypto.subtle.exportKey('spki', kp.publicKey);
    const pubB64 = btoa(String.fromCharCode(...new Uint8Array(spki)));
    await fetch(`${API_LUTADORES}/handshake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: pubB64 })
    });
}

export async function decryptResponse(res) {
    if (res.headers.get('X-Content-Encrypted') !== 'true') return res;
    const chunks = JSON.parse(await res.text());
    const bytes = [];
    for (const chunk of chunks) {
        const cb = Uint8Array.from(atob(chunk), c => c.charCodeAt(0));
        const plain = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, _privateKey, cb);
        bytes.push(...new Uint8Array(plain));
    }
    const decoded = new TextDecoder().decode(new Uint8Array(bytes));
    return {
        json: () => JSON.parse(decoded)
    };
}
