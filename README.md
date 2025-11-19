# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running the application

Follow these steps to get the application running on your local machine.

### 1. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Genkit with the Google AI plugin, which requires a Gemini API key.

1.  Create a file named `.env` in the root of the project.
2.  Add your Gemini API key to the `.env` file:

```
GEMINI_API_KEY="YOUR_API_KEY"
```

You can obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the Development Servers

You'll need to run two separate processes in two different terminals: one for the Next.js application and one for the Genkit AI flows.

1.  **Run the Genkit server:**

    This command starts the Genkit server and watches for changes in your AI flow files.

    ```bash
    npm run genkit:watch
    ```

2.  **Run the Next.js server:**

    This command starts the Next.js development server.

    ```bash
    npm run dev
    ```

The application will now be available at [http://localhost:9003](http://localhost:9003).
