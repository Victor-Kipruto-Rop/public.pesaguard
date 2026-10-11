import Link from "next/link";
import { docsUrl } from "@/config/docs";

export function ResourcesMenu() {
  return <Link href={docsUrl()}>Resources</Link>;
}
