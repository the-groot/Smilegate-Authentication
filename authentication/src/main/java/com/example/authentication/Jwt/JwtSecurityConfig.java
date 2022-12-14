package com.example.authentication.Jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    //SecurityConfigurerAdapter를 extends하고
    private TokenProvider tokenProvider;
    public JwtSecurityConfig(TokenProvider tokenProvider) { //TokenProvider를 주입받아서
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) {
        http.addFilterBefore(
                new JwtFilter(tokenProvider),       //jwtFilter를 통해 Security로직에 필터를 등록한다
                UsernamePasswordAuthenticationFilter.class
        );
    }
}