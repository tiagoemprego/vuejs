<template>
    <div class="header">
        <div class="container">
            <div class="wrapper-header pt-3 pb-4">
                <div class="logo pr-2 pr-md-3 align-self-center">
                    <router-link to="/">
                        <img src="../../assets/images/logo-header.png" alt="logo"/>
                    </router-link>
                </div>
                <div class="wrapper-content">
                    <div class="heade-text"><p>Vale cerveja</p></div>
                    <div class="itens-menu d-none d-md-inline-block">
                        <ul>
                            <li><router-link to="/">Home</router-link></li>
                            <li><router-link to="#">Meus créditos</router-link></li>
                            <li><router-link to="#">Meus vales-cervejas</router-link></li>
                            <li><router-link to="#">Minhas notas fiscais</router-link></li>
                            <li><router-link to="#">Historico de nf</router-link></li>
                            <li><router-link to="#">Fale conosco</router-link></li>
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                    <div class="menu d-md-none">
                        <p>menu</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss" scoped>
    .container{
        max-width: 1200px;
        width: 100%;
    }
    .header{
        background-color: #F9D752;

        &>div{
            display: flex;
        }
        .logo{
            img{
                max-width: 35px;
            }
        }

        p{
            margin: 0;
            font-family: Bebas-Neue-Bold;
            text-transform: uppercase;
        }

        .wrapper{
            &-header{
                display: flex;
                max-width: 414px;
                width: 100%;
                margin: auto;

                .itens-menu{
                    position: absolute;
                    border: 3px solid #000000;
                    border-top: 0;
                    padding: 0 0 20px;
                    background-color: #f9d752;

                    ul{
                        list-style: none;
                        padding: 0;
                        margin: 0;

                        li{
                            border-bottom: 3px solid #000;
                            margin-left: 20px;
                            text-transform: uppercase;
                            font-family: Barlow-Condensed-Bold;
                            padding-top: 15px;

                            a{
                                color: #000;
                                font-size: 25px;
                                text-decoration: none;
                                font-family: Barlow-Condensed-Bold;
                                line-height: 1;
                            }
                        }
                    }
                }

            }

            &-content{
                display: flex;
                border: 3px solid #000;
                flex: 0 0 83.33333%;
                max-width: 83.33333%;

                .heade-text{
                    flex: 0 0 66.66667%;
                    max-width: 66.66667%;
                    align-self: center;
                    text-align: center;
                }

                .menu{
                    border-left: 3px solid #000;
                    padding: 10px;
                    flex: 0 0 33.33333%;
                    max-width: 33.33333%;
                }
            }
        }


        @media only screen and (min-width: 768px) {
           .wrapper{
               &-header {
                   max-width: 100%;

                   .itens-menu{
                       position: relative;
                       border: 0;
                       padding: 0;
                       background-color: transparent;

                       ul{
                           display: flex;

                           li{
                               /*float: left;*/
                               border-bottom: 0;
                               padding: 10px 1.5vw 8px 0;
                               margin: 0;

                               &:first-child{
                                   border-left: 3px solid #000000;
                                   padding-left: 1.5vw;
                               }

                               a{
                                   font-size: 20px;
                                   font-family: Barlow-Condensed-SemiBold;
                               }
                           }
                       }
                   }

                   p{
                       font-size: 20px;
                   }
               }

               &-content{
                   display: inline-block;
                   border: 3px solid #000;
                   background-color: #dfc149;
                   max-width: 100%;
                   flex: inherit;

                   &>div{
                       display: inline-block;

                       &:first-child{
                           padding: 0 20px;
                       }
                   }
               }
           }
        }
    }

</style>
