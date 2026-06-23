<template>
  <div class="min-h-screen bg-[#f5f5f2] px-5 sm:px-[12.5%] py-16 sm:py-28 flex flex-col gap-6">
    <h2 class="text-4xl sm:text-6xl font-medium leading-snug tracking-tight text-text">Meet Our Team!</h2>
    <BioCard
      name="Collin Brennan"
      role="Founder & CEO"
      interests="Engineering, Education Reform, Music"
      bio="I'm Collin, founder of Routined. I fell in love with learning in college but constantly hit walls with complex concepts,
      and assumed I was the problem. Then a discrete structures class changed everything. My professor didn't just teach content, 
      he mapped how ideas connected. Something clicked. I realized the gap wasn't in me, it was in how I was being taught. 
      Routined exists to close that gap — giving every learner the tools and guidance to build knowledge with confidence. I have found
      a love for building, mentoring, and a life long committment to learning. 
      "
      image="me.jpg"
      email="collinbrennanwork@gmail.com"
      linkedin="https://www.linkedin.com/in/colbren04/"
    />
  </div>
</template>

<script setup>
import BioCard from '../components/BioCard.vue'
</script>
