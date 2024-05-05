import type { MetaFunction } from "@remix-run/node";
import { Tracker } from "~/components/tracker";

export const meta: MetaFunction = () => {
  return [{ title: "Weed Tracker" }, { name: "description", content: "Track your weed-sperience" }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Tracker />
    </div>
  );
}
