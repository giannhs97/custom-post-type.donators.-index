<?php

function donators_template(){

    $currentLang = apply_filters( 'wpml_current_language', NULL );
    ob_start();
    ?>
    <div class = 'donators-container'>
        <div class = 'donators-head'>
            <div class = "country">
                <p class = 'donators-country'><span class='greece' data-abroad = "no"><?php _e('ΕΛΛΑΔΑ', 'the7dtchild') ?></span> / <span class='abroad' data-abroad = "yes"><?php _e('ΕΞΩΤΕΡΙΚΟ', 'the7dtchild') ?></span></p>
            </div>
            <div class="input-button">
                <div class="reset-filters">
                    <button type="submit" class="reset-button">Επαναφορά Φίλτρων</button>
                </div>
                <input type='filter' class = 'search-donator' placeholder='<?php _e('Αναζήτηση Ονόματος', 'the7dtchild') ?>'>
            </div>
        </div>
        
        <div class="alphabet">
            <?php if($currentLang == 'el'){ ?>
                    <span>Α</span><span>Β</span><span>Γ</span><span>Δ</span><span>Ε</span><span>Ζ</span><span>Η</span><span>Θ</span><span>Ι</span><span>Κ</span><span>Λ</span><span>Μ</span><span>Ν</span><span>Ξ</span><span>Ο</span><span>Π</span><span>Ρ</span><span>Σ</span><span>Τ</span><span>Υ</span><span>Φ</span><span>Χ</span><span>Ψ</span><span>Ω</span><br>
            <?php }

                    echo '<span>';
                    echo implode('</span><span>', range('A','Z'));
                    echo '</span>';
            ?>
		</div>

        <div id="donators-block">
				<?php 
                    $loop = new WP_Query( array( 
                        'post_type' => 'donators', 
                        'posts_per_page' => -1, 
                        'orderby' => 'date' ,
                        'order' => 'DEC'
                    )); 
                ?>
                    
				<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                    <div class = "donator" data-abroad = <?php echo get_field( 'is_from_abroad' ) == false ?  "no" :  "yes"?> >
						<span class="name"> <?php the_field('donator_name'); ?> </span> <span class = "surname"><?php the_field('donator_surname'); ?></span>
					</div>
					
				<?php endwhile; wp_reset_query(); ?>
		</div>

        <div class="donators-scrollable-container">
			<div id="donatorsScrollable" class="scrollable">
				<div class="items">
					
				</div>
			</div>
		</div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('donators', 'donators_template');

?>