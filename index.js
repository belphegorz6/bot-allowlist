const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db")
const db = new QuickDB()


const GUILD_ID = '973000791663206410';
const ROLE_ID = '1070077954077495336';



process.on("uncaughtException", (err) => {
	console.log("ERROR: Uncaught Exception:\n" + err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("ERROR: Rejeição possivelmente não tratada em:\n" + "promisse:\n" + promise + "\nmotivo:\n" + reason.message);
});

const { Client, Collection, Partials, GatewayIntentBits, WebhookClient, EmbedBuilder } = require("discord.js");
const handler = require("./handler/index.js");
require('dotenv').config();
const client = new Client({
        allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false
        },
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.Reaction,
        ],
});

module.exports = client;

const Discord = require("discord.js");

client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config.json');

handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

// Webhook command logs
const webhookUrl = 'https://ptb.discord.com/api/webhooks/1127646012274638950/0I4MeHCKmp22mnEAZKIb-g3vm3BtqkAaSTaA6muPaX6hNNz0fm-fRO3kptMMnFWkOTZ2'; // WebHook URL
const webhookClient = new WebhookClient({ url: webhookUrl });

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;




// Commands args
  const args = interaction.options._hoistedOptions.map((option) => {
    return `${option.name}: ${option.value}`;
  });

  let logMessage = new EmbedBuilder()
  .setColor("Grey")
  .setTitle("🛡️ Commands Logs:")
  .setDescription(`> 🛰️ **Command:** \`${interaction.commandName}\`
  > 👤 **Run by:** \`${interaction.user.tag}\` - \`${interaction.user.id}\`
  > 🗺️ **Server:** \`${interaction.guild.name}\`
  > 💡 **Args:**  \`${args.join(' | ')}\``)

  webhookClient.send({ embeds: [logMessage] });
});
// -------------------------------------



client.on("guildMemberAdd", (member) => {
  let canal_logs = "1070078018510397580";
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
  .setColor("Green")
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setTitle("👋 Boas Vindas!")
  .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content".
})




client.on("interactionCreate", async(interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulario") {
      if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
      const modal = new Discord.ModalBuilder()
      .setCustomId("modal")
      .setTitle("Whitelist - Ashland Roleplay");

      const pergunta1 = new Discord.TextInputBuilder()
      .setCustomId("pergunta1") // Coloque o ID da pergunta
      .setLabel("Qual o nome do seu personagem e seu ID?") // Coloque a pergunta
      .setMaxLength(30) // Máximo de caracteres para a resposta
      .setMinLength(5) // Mínimo de caracteres para a respósta
      .setPlaceholder("Exemplo: João Cleber | 1") // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
      .setCustomId("pergunta2") // Coloque o ID da pergunta
      .setLabel("Cite um exemplo de Power-Roleplay") // Coloque a pergunta
      .setMaxLength(100) // Máximo de caracteres para a resposta
      .setPlaceholder("Exemplo: Power-Roleplay é vender drogas em área safe.") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta3 = new Discord.TextInputBuilder()
      .setCustomId("pergunta3") // Coloque o ID da pergunta
      .setLabel("O que é Vehicle Deathmatch") // Coloque a pergunta
      .setMaxLength(100)
      .setPlaceholder("Exemplo: Vehicle Deathmatch é subir a montanha com carro de drift.") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta4 = new Discord.TextInputBuilder()
      .setCustomId("pergunta4") // Coloque o ID da pergunta
      .setLabel("Quais as zonas Safe do servidor?") // Coloque a pergunta
      .setMaxLength(100)
      .setPlaceholder("Exemplo: As safe-zones do servidor, são: Departamento Policial e Loja de Departamento.") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta5 = new Discord.TextInputBuilder()
      .setCustomId("pergunta5") // Coloque o ID da pergunta
      .setLabel("Por, qual sua história?") // Coloque a pergunta
      //.setMaxLength(100)
      .setPlaceholder("Exemplo: Pedro tinha um sonho e tals...") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)



      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3),
        new Discord.ActionRowBuilder().addComponents(pergunta4),
        new Discord.ActionRowBuilder().addComponents(pergunta5)
      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")
      let resposta4 = interaction.fields.getTextInputValue("pergunta4")
      let resposta5 = interaction.fields.getTextInputValue("pergunta5")

      if (!resposta1) resposta1 = "Não informado."
      if (!resposta2) resposta2 = "Não informado."
      if (!resposta3) resposta3 = "Não informado."
      if (!resposta4) resposta4 = "Não informado."
      if (!resposta5) resposta5 = "Não informado."

      let embed = new Discord.EmbedBuilder()
      .setColor("Green")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`O usuário ${interaction.user} enviou a whitelist abaixo:`)
      .addFields(
        {
          name: `Pergunta 1:`,
          value: `*Qual o nome do seu personagem e seu ID?:* \`${resposta1}\``,
          inline: false
        },
        {
          name: `Pergunta 2:`,
          value: `*Cite um exemplo de Power-Roleplay:* \`${resposta2}\``,
          inline: false
        },
        {
          name: `Pergunta 3:`,
          value: `*O que é Vehicle Deathmatch:* \`${resposta3}\``,
          inline: false
        },
        {
          name: `Pergunta 4:`,
          value: `*Quais as zonas Safe do servidor?:* \`${resposta4}\``,
          inline: false
        },
        {
          name: `Historia:`,
          value: `*Historia:* \`${resposta5}\``,
          inline: false
        }
      );

      interaction.reply({ content: `Olá **${interaction.user.username}**, sua Allowlist foi enviada com sucesso! Em alguns instantes um Aprovador irá ler a mesma\ 
      e o resultado será enviado em <#1070077998755238028>`, ephemeral: true})


		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Enviar Resultado')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(confirm);

      await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed], components: [row], })
    }
  }
})


client.on("interactionCreate", async(interaction) => {
  let approve = "1070077998755238028";
  if (!approve) return;

  if (interaction.isButton()) {
    if (interaction.customId === "confirm") {
      //if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
      const modal = new Discord.ModalBuilder()
      .setCustomId("modal2")
      .setTitle("Enviar Resultado");

      const pergunta1 = new Discord.TextInputBuilder()
      .setCustomId("pergunta1") // Coloque o ID da pergunta
      .setLabel("Qual ID do discord do Membro?") // Coloque a pergunta
      .setMaxLength(18) // Máximo de caracteres para a resposta
      .setMinLength(18) // Mínimo de caracteres para a respósta
      .setPlaceholder("Exemplo: 111111111111111111") // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
      .setCustomId("pergunta2") // Coloque o ID da pergunta
      .setLabel("Qual o resultado?") // Coloque a pergunta
      //.setMaxLength(30) // Máximo de caracteres para a resposta
      //.setMinLength(5) // Mínimo de caracteres para a respósta
      .setPlaceholder("Coloque apenas: Aprovada ou Reprovada.") // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)

      const pergunta3 = new Discord.TextInputBuilder()
      .setCustomId("pergunta3") // Coloque o ID da pergunta
      .setLabel("Alguma observação?") // Coloque a pergunta
      //.setMaxLength(30) // Máximo de caracteres para a resposta
      //.setMinLength(5) // Mínimo de caracteres para a respósta
      .setPlaceholder("Deixe alguma observação.") // Mensagem que fica antes de escrever a resposta
      .setRequired(false) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)


      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3)

      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal2") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")


      if (!resposta1) resposta1 = "Não informado."
      if (!resposta2) resposta2 = "Não informado."
      if (!resposta3) resposta3 = "Não informado."


      let embed = new Discord.EmbedBuilder()
      .setColor("Green")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Resultado Allowlist:`)
      .addFields(
        {
          name: `Gostaria de informar ao jogador:`,
          value: `<@${resposta1}>.`,
          inline: false
        },
        {
          name: `Que sua Allowlist foi:`,
          value: `\`${resposta2}\``,
          inline: false
        },
        {
          name: `Observações`,
          value: `\`${resposta3}\``,
          inline: false
        }
      )
      .setFooter("Faça a liberação do seu ID em <#1070078028677390446>")

      interaction.reply({ content: `Resultado enviado!`, ephemeral: true})


      await interaction.guild.channels.cache.get(approve).send({ embeds: [embed] }) 
      
    }
  }
})







// Login
client.login(process.env.clientToken);