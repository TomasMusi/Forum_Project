<script lang="ts">
    import type { BootstrapIcon } from '$/types/bootstrap_icons';
    import { string } from 'zod';
    //                  kvůli tomu, že class existuje v Sveltkitu tak to musíme přejmenovat.
    // class: cls = ''; Jakože je to defaultně prázdný
    const { name, class: cls = '' }: { name: BootstrapIcon; class?: string } = $props();
</script>

<!-- BI jako Boostrap icons-->
<i class="bi {name} {cls}"></i>
