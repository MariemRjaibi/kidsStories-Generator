import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import mainImage from "@/assets/images/kidStory.jpg";
import { Form, Button, Spinner } from "react-bootstrap";
import { FormEvent, useState } from "react";

export default function Home() {
  const [story, setStory] = useState("");
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyLoadingError, setStoryLoadingError] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();
    if (prompt) {
      try {
        setStory("");
        setStoryLoadingError(false);
        setStoryLoading(true);

        const response = await fetch(
          "/api/story?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setStory(body.story);
      } catch (error) {
        // console.error(error);
        setStoryLoadingError(true);
      } finally {
        setStoryLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Create a specific kid story</title>
        <meta name="description" content="by Mariem Rjaibi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>
          Your kids need more creactive stories,
          <br />
          please don't let them get bored from now{" "}
        </h1>
        <h3>Enter a topic and get a fascinating story</h3>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill
            alt="a picture of a happy kid "
            priority
            className={styles.mainImage}
          />
        </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          {/* a bootstrap component */}
          <Form.Group className="mb-3" controlId="prompt-input">
            <Form.Label> Create a story about a specific topic ...</Form.Label>
            <Form.Control
              name="prompt"
              placeholder="e.g. grandparents, nature, fear, courage ..."
              maxLength={100}
            />
          </Form.Group>
          <Button type="submit" className="mb-3" disabled={storyLoading}>
            Write me a story
          </Button>
        </Form>
        {storyLoading && <Spinner animation="border" />}
        {storyLoadingError && "Something went wrong. Please try again."}
        {story && <h5 className={styles.story}>{story}</h5>}
      </main>
    </>
  );
}
