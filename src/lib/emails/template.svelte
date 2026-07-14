<script lang="ts">
  import {
    Html,
    Head,
    Body,
    Preview,
    Container,
    Section,
    Text,
    Hr,
    Img,
  } from "@better-svelte-email/components";
  import type { Snippet } from "svelte";

  interface Props {
    realmName?: string;
    locale?: string;
    preview?: string;
    logoUrl?: string;
    logoWidth?: string;
    logoHeight?: string;
    footerAddress?: string;
    children?: Snippet;
  }

  const baseUrl = "${url.resourcesUrl}";

  let {
    realmName = "Keycloak Auth",
    locale = "en",
    preview,
    logoUrl = `${baseUrl}/favicon.svg`,
    logoWidth = "120",
    logoHeight = "32",
    footerAddress = "Your Organization Name & Address",
    children,
  }: Props = $props();
</script>

<Html lang={locale}>
  <Head />
  <Body class="bg-zinc-100 py-6 font-sans">
    {#if preview || realmName}
      <Preview preview={preview || realmName} />
    {/if}
    <Container class="mx-auto max-w-lg rounded-xl bg-white px-8 py-8">
      <!-- Header -->
      <Section class="mb-8 text-center">
        <Img
          src={logoUrl}
          width={logoWidth}
          height={logoHeight}
          alt="Logo"
          class="mx-auto mb-5 block"
        />

        <Text class="m-0 text-xl font-semibold tracking-tight text-zinc-950">
          {realmName}
        </Text>
      </Section>

      <Hr class="my-0 border-zinc-200" />

      <!-- Main Content Body -->
      <Section class="mx-auto text-left" style="text-align: left;">
        {@render children?.()}
      </Section>

      <Hr class="my-0 border-zinc-200" />

      <!-- Footer -->
      <Section class="pt-6">
        <Text class="m-0 text-xs leading-6 text-zinc-500">
          This is an automated message from <strong>{realmName}</strong>. Please
          do not reply directly to this email.
        </Text>

        <Text class="mt-2 text-xs leading-6 text-zinc-400">
          {footerAddress}
        </Text>
      </Section>
    </Container>
  </Body>
</Html>
