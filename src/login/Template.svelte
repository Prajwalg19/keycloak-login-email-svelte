<script lang="ts">
  import { onMount } from "svelte";
  import { useInitialize } from "@keycloakify/svelte/login/Template.useInitialize";
  import type { TemplateProps } from "@keycloakify/svelte/login/TemplateProps";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";

  import type { I18n } from "./i18n";
  import type { KcContext } from "./KcContext";

  // Icons
  import {
    CircleAlert,
    CircleCheck,
    Info,
    TriangleAlert,
    Globe,
  } from "@lucide/svelte";

  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "$lib/components/ui/select";

  import SplashPage from "./components/SplashPage.svelte";
  import { cn } from "$lib/utils";

  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = true,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  }: TemplateProps<KcContext, I18n> & { displayWide?: boolean } = $props();

  const { msgStr, currentLanguage, enabledLanguages } = $i18n;
  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

  onMount(() => {
    document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
</script>

{#if $isReadyToRender}
  <div
    class={cn("grid min-h-svh", displayWide ? "lg:grid-cols-2" : "grid-cols-1")}
  >
    <!-- Left image -->
    {#if displayWide}
      <div class="relative hidden bg-muted lg:block">
        <SplashPage />
      </div>
    {/if}

    <!-- Right content -->
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <!-- Header -->
      <div class="flex items-center justify-between gap-2">
        <a
          href={url.loginAction || "#"}
          class="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900"
        >
          {realm.displayNameHtml || realm.displayName || realm.name}
        </a>

        {#if enabledLanguages.length > 1}
          <Select
            type="single"
            value={currentLanguage.languageTag}
            onValueChange={(value) => {
              const lang = enabledLanguages.find(
                (l) => l.languageTag === value,
              );
              if (lang) window.location.href = lang.href;
            }}
          >
            <SelectTrigger class="h-8 w-36 text-xs">
              <Globe class="mr-2 h-3 w-3" />
              {currentLanguage.label}
            </SelectTrigger>
            <SelectContent>
              {#each enabledLanguages as lang (lang.languageTag)}
                <SelectItem value={lang.languageTag}>
                  {lang.label}
                </SelectItem>
              {/each}
            </SelectContent>
          </Select>
        {/if}
      </div>

      <!-- Main -->
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs space-y-6">
          <!-- Messages -->
          {#if displayMessage && message && (message.type !== "warning" || !isAppInitiatedAction)}
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
            >
              {#if message.type === "success"}
                <CircleCheck class="h-4 w-4" />
              {:else if message.type === "warning"}
                <TriangleAlert class="h-4 w-4" />
              {:else if message.type === "error"}
                <CircleAlert class="h-4 w-4" />
              {:else}
                <Info class="h-4 w-4" />
              {/if}
              <AlertTitle class="capitalize">
                {message.type}
              </AlertTitle>
              <AlertDescription>
                {@html kcSanitize(message.summary)}
              </AlertDescription>
            </Alert>
          {/if}

          <!-- Title / username -->
          {#if !(auth?.showUsername && !auth?.showResetCredentials)}
            <h1 class="text-center text-2xl font-semibold">
              {@render headerNode?.()}
            </h1>
          {:else}
            <div class="text-center text-sm text-muted-foreground">
              {auth.attemptedUsername}
              ·
              <a href={url.loginRestartFlowUrl} class="underline">
                {msgStr("restartLoginTooltip")}
              </a>
            </div>
          {/if}

          <!-- Required fields notice -->
          {#if displayRequiredFields}
            <p class="text-center text-xs text-muted-foreground">
              <span class="text-destructive">*</span>
              {msgStr("requiredFields")}
            </p>
          {/if}

          <!-- Form -->
          <div class="grid gap-6">
            {@render children?.()}
          </div>

          <!-- Try another way -->
          {#if auth?.showTryAnotherWayLink}
            <form action={url.loginAction} method="post">
              <input type="hidden" name="tryAnotherWay" value="on" />
              <button class="text-sm text-muted-foreground underline">
                {msgStr("doTryAnotherWay")}
              </button>
            </form>
          {/if}

          {@render socialProvidersNode?.()}

          {#if displayInfo}
            <div class="text-center text-sm text-muted-foreground">
              {@render infoNode?.()}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
