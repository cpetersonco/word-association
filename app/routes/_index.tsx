import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";

import {
  Association,
  addWordToAssociation,
  getRandomAssociation,
} from "~/models/association.server";
import { useEffect, useRef } from "react";

export const loader = async (): Promise<Association> => {
  // TODO: Use session data to prevent multiple consecutive submissions for one association
  return await getRandomAssociation();
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const word = formData.get("word") as string;
  console.log({ id, word });

  // TODO: Validate that the submission doesn't match the preceding word, e.g. ["man", "woman", "man"]
  await addWordToAssociation({
    id: id,
    word: word,
  });
  return json({ ok: true });
}

export default function Index() {
  const association = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isAdding =
    navigation.state === "submitting" &&
    navigation.formData?.get("_action") === "create";
  console.log({ association });

  // clear input on submission
  const formRef = useRef(null);
  const wordRef = useRef(null);
  useEffect(() => {
    if (!isAdding) {
      console.log("Is not adding");
      wordRef.current?.focus();
      formRef.current?.reset();
    }
  }, [isAdding]);

  const previousWord = association?.words.at(-1);

  return (
    <main className="container mx-auto">
      <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto mt-16">
        <h2 className="block w-fit text-4xl pb-8 m-auto">{previousWord}</h2>
        <Form ref={formRef} method="post" autoComplete="off">
          <input
            autoComplete="false"
            type="hidden"
            name="id"
            value={association?.id}
          />

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="word"
            >
              Enter a word
            </label>
            <input
              ref={wordRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="word"
              type="text"
              placeholder="What do you think..."
              name="word"
            />
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              name="_action"
              value="create"
              disabled={isAdding}
            >
              {isAdding ? "Adding your word" : "Add word"}
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}
