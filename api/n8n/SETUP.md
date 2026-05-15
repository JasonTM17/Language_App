# n8n AI Chatbot Setup

## Prerequisites

- n8n running locally or on a server
- OpenAI API key (or compatible provider)

## Quick Setup

1. **Import the workflow**
   - Open n8n dashboard
   - Go to Workflows → Import from File
   - Select `workflow-template.json`

2. **Configure OpenAI credentials**
   - In n8n, go to Credentials → Add Credential → OpenAI
   - Enter your API key
   - Connect it to the "OpenAI Chat" node

3. **Activate the workflow**
   - Click "Active" toggle in the workflow editor
   - Note the webhook URL (shown in the Webhook node)

4. **Configure LinguaFlow API**
   - Set `N8N_WEBHOOK_URL` in your `.env` file:
   ```
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/linguaflow-chat
   ```

## How It Works

```
LinguaFlow API → n8n Webhook → OpenAI → Response back to API
```

The API sends:
- `messages`: conversation history
- `language`: target language code (en/ja/zh/ko)
- `role`: conversation role (teacher/friend/interviewer/restaurant/customer)
- `systemPrompt`: pre-built prompt for the AI

The workflow returns:
- `output`: AI response text

## Customization

You can extend the workflow in n8n to:
- Add memory nodes for longer conversations
- Use different AI models per language
- Add translation nodes
- Log conversations to a database
- Add content moderation

## Fallback

If n8n is not running or the webhook fails, LinguaFlow automatically falls back to built-in mock responses. No configuration needed for development.
