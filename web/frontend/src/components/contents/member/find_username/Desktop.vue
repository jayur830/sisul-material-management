<template>
    <div id="desktop-find-username">
        <div>
            <div>
                <div class="animate__animated animate__fadeInDown">
                    <table>
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">근무반</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <label>
                                        <select v-model="workClass">
                                            <option value="*">--- 근무반 선택 ---</option>
                                            <option :key="i" v-for="(workClass, i) in workClasses" :value="workClass">{{ workClass }}</option>
                                        </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">이름</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="text" v-model="workerName" @keyup="e => { if (e.key === 'Enter') findUsername(); }" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="animate__animated animate__fadeInUp">
                                    <input type="button" class="btn" value="뒤로가기" @click="$router.back()" />
                                    <input type="button" class="btn" value="아이디 찾기" @click="findUsername" />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FindUsernameMixin from "./FindUsernameMixin";

    export default {
        name: "DesktopFindUsername",
        mixins: [FindUsernameMixin],
        mounted() {
            this.setWorkClasses();
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
