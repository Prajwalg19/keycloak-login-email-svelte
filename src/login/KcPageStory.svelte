<script module lang="ts">
  /**
   * Generic-equivalent props of:
   * createKcPageStory<PageId extends KcContext["pageId"]>
   */
  export interface KcPageStoryProps<
    PageId extends KcContext["pageId"] = KcContext["pageId"],
  > {
    pageId: PageId;
    kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
  }
</script>

<script lang="ts">
  import type { DeepPartial } from "keycloakify/tools/DeepPartial";
  import type { KcContext } from "./KcContext";
  import KcPage from "./KcPage.svelte";
  import { getKcContextMock } from "./KcPageStory";

  const { pageId, kcContext: overrides }: KcPageStoryProps = $props();

  const kcContextMock = getKcContextMock({
    pageId,
    overrides,
  });
</script>

<KcPage kcContext={kcContextMock} />
