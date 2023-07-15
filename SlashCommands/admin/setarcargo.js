const Discord = require("discord.js")

module.exports = {
    name: "setarcargo",
    description: "Adicionar o Cargo a Um Usuario.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Selecione o Usuario.",
            required: true

        },
        {
            name: "cargo",
            type: Discord.ApplicationCommandOptionType.Role,
            description: "Selecione o Cargo.",
            required: true

        }

    ],

    run: async (client, interaction) => {

        let user = interaction.options.getUser("usuario");
        let role = interaction.options.getRole("cargo");

        if (!interaction.member.permissions.has("MANAGE_ROLES")) {
            return interaction.reply(`Você não possui a permissão de \`Gerenciar Cargos\`.`)
        }

        if (!user || !role) {
            interaction.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor({ name: 'Manager', iconURL: '' })
                    .setTitle("Comando Errado...")
                    .setTimestamp(new Date)
                    .setDescription(`\`/addrole [Usuário] [Cargo]\``)]
            });
        } else if (user && role) {
            interaction.reply(`✅ O usuário ${user} recebeu o cargo \`${role.name}\`.`).then(msg => {
                user.roles.add(role.id).catch(e => { interaction.editReply(`:x: Não foi possível adicionar o cargo \`${role.name}\` no usuário ${user}!`) })
            })
        }

    }
}