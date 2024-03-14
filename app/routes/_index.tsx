import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";

import {
  addWordToAssociation,
  getRandomAssociation,
} from "~/models/association.server";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async () => {
  // TODO: Use session data to prevent multiple consecutive submissions for one association
  const randomAssociation = await getRandomAssociation();
  console.log({ randomAssociation });
  return json(randomAssociation);
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // TODO: Validate that the submission doesn't match the preceding word, e.g. ["man", "woman", "man"]

  addWordToAssociation({
    associationId: formData.get("id"),
    word: formData.get("word"),
  });
  return json({ ok: true });
}

export default function Index() {
  const association = useLoaderData<typeof loader>();
  console.log({ association });

  const previousWord = association?.words.at(-1);

  const $form = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "idle" && actionData?.ok) {
        $form.current?.reset();
      }
    },
    [navigation.state, actionData],
  );

  return (
    <main>
      <h1>{previousWord}</h1>
      <Form method="post" autocomplete="off" ref={$form}>
        <input
          autoComplete="false"
          type="hidden"
          name="id"
          value={association?.id}
        />

        <label>
          <input nautocomplete="off" name="word" />
        </label>
        <div>
          <button type="submit">Add Word </button>
        </div>
      </Form>
    </main>
  );
}
