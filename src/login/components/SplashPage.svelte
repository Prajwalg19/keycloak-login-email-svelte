<script lang="ts">
  import { SPLASHPAGEIMAGES, QUOTES } from "../SplashPageImages";

  const randomImg = Math.floor(Math.random() * SPLASHPAGEIMAGES.length);
  const bgurl = SPLASHPAGEIMAGES[randomImg];

  const randomQuoteIndex = Math.floor(Math.random() * QUOTES.length);
  const quote = QUOTES[randomQuoteIndex];
</script>

<div class="relative h-full w-full overflow-hidden bg-muted">
  <img
    src={bgurl}
    alt="Authentication background"
    class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
  />

  <div
    class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-10"
  >
    <blockquote class="space-y-2">
      <p class="text-lg leading-relaxed text-white italic">
        “{quote.message}”
      </p>
      <footer class="text-sm font-medium text-white/80">
        — {quote.author}
      </footer>
    </blockquote>
  </div>
</div>
