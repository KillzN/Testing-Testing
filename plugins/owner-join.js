let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
    if (!text) return m.reply(`🚩 *Falta el enlace del grupo.*\nPor favor, proporciona un enlace de invitación válido.`);

    try {
        let [_, code] = text.match(linkRegex) || [];
        if (!code) return m.reply('⚠️ *Enlace inválido.* Asegúrate de que el enlace sea correcto.');

        const groupId = await conn.groupAcceptInvite(code);
        const metadata = await conn.groupMetadata(groupId);

        m.reply(`✅ Me he unido al grupo *${metadata.subject}*.\n👤 He sido agregado por: *KillzN*`);
    } catch {
        return m.reply('❌ Ocurrió un error al intentar unirse al grupo. Intenta nuevamente más tarde.');
    }
};

handler.help = ['join <link>'];
handler.tags = ['owner'];
handler.command = ['join', 'entrar'];
handler.rowner = true;

export default handler;
