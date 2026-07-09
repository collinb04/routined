<template>
  <div class="bg-[#f5f5f2] min-h-[calc(100vh-4rem)] flex flex-col items-center px-5 py-16">
    <div class="max-w-lg w-full flex flex-col gap-6">

      <RouterLink to="/profile" class="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text transition-colors w-fit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Profile
      </RouterLink>

      <div class="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-[#f5f5f2] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-text-muted">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <h1 class="text-xl font-semibold tracking-tight text-text">Feedback Library</h1>
        <p class="text-sm text-text-dim leading-relaxed max-w-xs">
          Coming soon — this is where the bug reports and feedback you've submitted will show up.
        </p>
      </div>

    </div>
  </div>
</template>
