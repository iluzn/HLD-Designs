import java.util.*;

class Solution {
    public String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().reverseString(s)).append("\n");}System.out.print(sb);}}