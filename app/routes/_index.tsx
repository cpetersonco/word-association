import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import { prisma } from "~/db.server";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async () => {
  const randomAssociation = await prisma.association.findRandom({
    select: {
      id: true,
      words: true,
    },
  });
  return json(randomAssociation);
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  await prisma.association.update({
    where: { id: formData.get("id") },
    data: { words: { push: formData.get("word") } },
  });
  return null;
}

export default function Index() {
  const association = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  console.log(association);

  const previousWord = association?.words.at(-1);

  return (
    <Form method="post">
      <div>{previousWord}</div>
      <input type="hidden" name="id" value={association?.id} />

      <label>
        Word <input name="word" />
      </label>
      <button type="submit">Add Word </button>
    </Form>
  );
}
